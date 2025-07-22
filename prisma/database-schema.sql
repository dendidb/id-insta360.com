-- =============================================================================
-- Complete CMS Database Schema
-- Includes: Auth System, Blog, News, Products, and Core CMS functionality
-- =============================================================================

-- Drop tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS blog_comments;
DROP TABLE IF EXISTS blog_tags;
DROP TABLE IF EXISTS news_tags;
DROP TABLE IF EXISTS product_components;
DROP TABLE IF EXISTS product_reviews;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS settings;

-- =============================================================================
-- CORE SETTINGS TABLE
-- =============================================================================
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================================================
-- AUTHENTICATION SYSTEM
-- =============================================================================

-- Roles table
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar VARCHAR(255),
    bio TEXT,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(100),
    password_reset_token VARCHAR(100),
    password_reset_expires DATETIME,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_email_verification_token (email_verification_token),
    INDEX idx_password_reset_token (password_reset_token)
);

-- User roles junction table
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by INT,
    
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =============================================================================
-- MEDIA MANAGEMENT
-- =============================================================================
CREATE TABLE media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    alt_text VARCHAR(255),
    caption TEXT,
    uploaded_by INT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_mime_type (mime_type),
    INDEX idx_uploaded_by (uploaded_by)
);

-- =============================================================================
-- CATEGORIES AND TAGS SYSTEM
-- =============================================================================
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INT NULL,
    image_id INT NULL,
    meta_title VARCHAR(200),
    meta_description TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent_id (parent_id),
    INDEX idx_sort_order (sort_order)
);

CREATE TABLE tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#000000',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug)
);

-- =============================================================================
-- PRODUCTS SYSTEM
-- =============================================================================
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2) NULL,
    cost_price DECIMAL(10, 2) NULL,
    stock_quantity INT DEFAULT 0,
    manage_stock BOOLEAN DEFAULT TRUE,
    stock_status ENUM('in_stock', 'out_of_stock', 'on_backorder') DEFAULT 'in_stock',
    weight DECIMAL(8, 2),
    dimensions VARCHAR(100),
    featured_image_id INT,
    gallery JSON,
    attributes JSON,
    meta_title VARCHAR(200),
    meta_description TEXT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (featured_image_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_sku (sku),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_price (price),
    INDEX idx_stock_status (stock_status),
    FULLTEXT idx_search (name, description, short_description)
);

-- Product categories junction table
CREATE TABLE product_categories (
    product_id INT,
    category_id INT,
    
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Product images table
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    media_id INT NOT NULL,
    sort_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_sort_order (sort_order)
);

-- Product reviews table
CREATE TABLE product_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    review TEXT,
    reviewer_name VARCHAR(100) NOT NULL,
    reviewer_email VARCHAR(100) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    verified_purchase BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_id (product_id),
    INDEX idx_status (status),
    INDEX idx_rating (rating)
);

-- Product components table for page display components
CREATE TABLE product_components (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    component_type VARCHAR(100) NOT NULL,
    component_name VARCHAR(200) NOT NULL,
    component_title VARCHAR(255),
    description TEXT,
    options JSON,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_id (product_id),
    INDEX idx_component_type (component_type),
    INDEX idx_sort_order (sort_order),
    INDEX idx_is_active (is_active)
);

-- =============================================================================
-- E-COMMERCE ORDERS SYSTEM
-- =============================================================================
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    shipping_amount DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_id VARCHAR(100),
    
    -- Billing information
    billing_first_name VARCHAR(50) NOT NULL,
    billing_last_name VARCHAR(50) NOT NULL,
    billing_email VARCHAR(100) NOT NULL,
    billing_phone VARCHAR(20),
    billing_address VARCHAR(255) NOT NULL,
    billing_city VARCHAR(50) NOT NULL,
    billing_state VARCHAR(50) NOT NULL,
    billing_postal_code VARCHAR(20) NOT NULL,
    billing_country VARCHAR(50) NOT NULL,
    
    -- Shipping information
    shipping_first_name VARCHAR(50),
    shipping_last_name VARCHAR(50),
    shipping_address VARCHAR(255),
    shipping_city VARCHAR(50),
    shipping_state VARCHAR(50),
    shipping_postal_code VARCHAR(20),
    shipping_country VARCHAR(50),
    
    notes TEXT,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_order_number (order_number),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    product_sku VARCHAR(100),
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);

-- Shopping cart table
CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_id VARCHAR(100),
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_product_id (product_id)
);

-- =============================================================================
-- NEWS SYSTEM
-- =============================================================================
CREATE TABLE news (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    featured_image_id INT,
    author_id INT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_breaking BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    meta_title VARCHAR(200),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (featured_image_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at),
    INDEX idx_is_featured (is_featured),
    INDEX idx_is_breaking (is_breaking),
    INDEX idx_author_id (author_id),
    FULLTEXT idx_search (title, excerpt, content)
);

-- News tags junction table
CREATE TABLE news_tags (
    news_id INT,
    tag_id INT,
    
    PRIMARY KEY (news_id, tag_id),
    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- =============================================================================
-- BLOG SYSTEM
-- =============================================================================
CREATE TABLE blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    featured_image_id INT,
    author_id INT,
    category_id INT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    allow_comments BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    reading_time INT,
    meta_title VARCHAR(200),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (featured_image_id) REFERENCES media(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at),
    INDEX idx_is_featured (is_featured),
    INDEX idx_author_id (author_id),
    INDEX idx_category_id (category_id),
    FULLTEXT idx_search (title, excerpt, content)
);

-- Blog tags junction table
CREATE TABLE blog_tags (
    blog_id INT,
    tag_id INT,
    
    PRIMARY KEY (blog_id, tag_id),
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Blog comments table
CREATE TABLE blog_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    blog_id INT NOT NULL,
    user_id INT,
    parent_id INT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(100) NOT NULL,
    author_website VARCHAR(200),
    content TEXT NOT NULL,
    status ENUM('pending', 'approved', 'spam', 'rejected') DEFAULT 'pending',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_id) REFERENCES blog_comments(id) ON DELETE CASCADE,
    INDEX idx_blog_id (blog_id),
    INDEX idx_status (status),
    INDEX idx_parent_id (parent_id)
);

-- =============================================================================
-- INSERT INITIAL DATA
-- =============================================================================

-- Insert default roles
INSERT INTO roles (name, description, permissions) VALUES 
('superadmin', 'Super Administrator with full access', '["*"]'),
('admin', 'Administrator with management access', '["users.manage", "content.manage", "products.manage", "orders.manage"]'),
('editor', 'Content Editor', '["content.create", "content.edit", "content.publish"]'),
('author', 'Content Author', '["content.create", "content.edit"]'),
('customer', 'Regular Customer', '["profile.edit", "orders.view"]');

-- Insert default admin user (password: admin123 - should be changed)
INSERT INTO users (username, email, password_hash, first_name, last_name, is_active, email_verified) VALUES 
('admin', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', TRUE, TRUE);

-- Assign superadmin role to admin user
INSERT INTO user_roles (user_id, role_id, assigned_by) VALUES (1, 1, 1);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'My CMS Website', 'string', 'Website name'),
('site_description', 'A powerful CMS for managing content', 'string', 'Website description'),
('site_logo', '', 'string', 'Website logo URL'),
('site_email', 'info@example.com', 'string', 'Contact email'),
('posts_per_page', '10', 'number', 'Number of posts per page'),
('allow_registration', 'true', 'boolean', 'Allow user registration'),
('comment_moderation', 'true', 'boolean', 'Moderate comments before publishing'),
('currency', 'USD', 'string', 'Default currency'),
('tax_rate', '10', 'number', 'Default tax rate percentage'),
('shipping_cost', '5.00', 'number', 'Default shipping cost');

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES 
('General', 'general', 'General category for blog posts'),
('Technology', 'technology', 'Technology related posts'),
('Electronics', 'electronics', 'Electronic products'),
('Clothing', 'clothing', 'Clothing and fashion items'),
('Books', 'books', 'Books and publications');

-- Insert default tags
INSERT INTO tags (name, slug, color) VALUES 
('Featured', 'featured', '#ff6b6b'),
('News', 'news', '#4ecdc4'),
('Tutorial', 'tutorial', '#45b7d1'),
('Review', 'review', '#f9ca24'),
('Guide', 'guide', '#6c5ce7');

-- Insert sample product components
INSERT INTO product_components (product_id, component_type, component_name, component_title, description, options, sort_order, is_active, created_by) VALUES
-- Assuming we have a product with ID 1, these are sample components
-- (1, 'hero_banner', 'Product Hero', 'Main Product Banner', 'Hero banner component for product page', '{"background_color": "#ffffff", "text_color": "#333333", "show_price": true, "show_rating": true, "button_style": "primary"}', 1, TRUE, 1),
-- (1, 'product_gallery', 'Image Gallery', 'Product Image Gallery', 'Interactive product image gallery', '{"thumbnail_position": "bottom", "zoom_enabled": true, "autoplay": false, "show_dots": true}', 2, TRUE, 1),
-- (1, 'product_details', 'Product Information', 'Detailed Product Info', 'Tabbed product details section', '{"tabs": ["description", "specifications", "reviews"], "default_tab": "description", "show_share_buttons": true}', 3, TRUE, 1),
-- (1, 'related_products', 'Related Items', 'You May Also Like', 'Related products carousel', '{"max_items": 4, "show_price": true, "show_rating": true, "carousel_autoplay": false}', 4, TRUE, 1);
;

-- =============================================================================
-- VIEWS FOR EASIER QUERIES
-- =============================================================================

-- View for published blogs with author info
CREATE VIEW published_blogs AS
SELECT 
    b.*,
    u.username as author_username,
    u.first_name as author_first_name,
    u.last_name as author_last_name,
    c.name as category_name,
    c.slug as category_slug
FROM blogs b
LEFT JOIN users u ON b.author_id = u.id
LEFT JOIN categories c ON b.category_id = c.id
WHERE b.status = 'published' AND b.published_at <= NOW();

-- View for published news with author info
CREATE VIEW published_news AS
SELECT 
    n.*,
    u.username as author_username,
    u.first_name as author_first_name,
    u.last_name as author_last_name
FROM news n
LEFT JOIN users u ON n.author_id = u.id
WHERE n.status = 'published' AND n.published_at <= NOW();

-- View for active products with category info
CREATE VIEW active_products AS
SELECT 
    p.*,
    GROUP_CONCAT(c.name SEPARATOR ', ') as category_names
FROM products p
LEFT JOIN product_categories pc ON p.id = pc.product_id
LEFT JOIN categories c ON pc.category_id = c.id
WHERE p.status = 'published'
GROUP BY p.id;

-- =============================================================================
-- STORED PROCEDURES
-- =============================================================================

DELIMITER //

-- Procedure to update product stock
CREATE PROCEDURE UpdateProductStock(
    IN product_id INT,
    IN quantity_change INT
)
BEGIN
    UPDATE products 
    SET stock_quantity = stock_quantity + quantity_change,
        stock_status = CASE 
            WHEN (stock_quantity + quantity_change) <= 0 THEN 'out_of_stock'
            ELSE 'in_stock'
        END
    WHERE id = product_id;
END //

-- Procedure to get user's order history
CREATE PROCEDURE GetUserOrderHistory(
    IN user_id INT,
    IN limit_count INT DEFAULT 10
)
BEGIN
    SELECT 
        o.*,
        COUNT(oi.id) as item_count
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = user_id
    GROUP BY o.id
    ORDER BY o.created_at DESC
    LIMIT limit_count;
END //

DELIMITER ;

-- =============================================================================
-- TRIGGERS
-- =============================================================================

DELIMITER //

-- Trigger to update product stock status when stock quantity changes
CREATE TRIGGER update_product_stock_status 
    BEFORE UPDATE ON products 
    FOR EACH ROW
BEGIN
    IF NEW.manage_stock = TRUE THEN
        IF NEW.stock_quantity <= 0 THEN
            SET NEW.stock_status = 'out_of_stock';
        ELSE
            SET NEW.stock_status = 'in_stock';
        END IF;
    END IF;
END //

-- Trigger to automatically set published_at when status changes to published
CREATE TRIGGER set_blog_published_at 
    BEFORE UPDATE ON blogs 
    FOR EACH ROW
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
        SET NEW.published_at = NOW();
    END IF;
END //

CREATE TRIGGER set_news_published_at 
    BEFORE UPDATE ON news 
    FOR EACH ROW
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
        SET NEW.published_at = NOW();
    END IF;
END //

-- Trigger to update order total when order items change
CREATE TRIGGER update_order_total_on_item_insert
    AFTER INSERT ON order_items
    FOR EACH ROW
BEGIN
    UPDATE orders 
    SET subtotal = (
        SELECT SUM(total) FROM order_items WHERE order_id = NEW.order_id
    ),
    total_amount = subtotal + tax_amount + shipping_amount - discount_amount
    WHERE id = NEW.order_id;
END //

CREATE TRIGGER update_order_total_on_item_update
    AFTER UPDATE ON order_items
    FOR EACH ROW
BEGIN
    UPDATE orders 
    SET subtotal = (
        SELECT SUM(total) FROM order_items WHERE order_id = NEW.order_id
    ),
    total_amount = subtotal + tax_amount + shipping_amount - discount_amount
    WHERE id = NEW.order_id;
END //

CREATE TRIGGER update_order_total_on_item_delete
    AFTER DELETE ON order_items
    FOR EACH ROW
BEGIN
    UPDATE orders 
    SET subtotal = (
        SELECT COALESCE(SUM(total), 0) FROM order_items WHERE order_id = OLD.order_id
    ),
    total_amount = subtotal + tax_amount + shipping_amount - discount_amount
    WHERE id = OLD.order_id;
END //

DELIMITER ;

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Additional indexes for better performance
CREATE INDEX idx_blogs_status_published_at ON blogs(status, published_at);
CREATE INDEX idx_news_status_published_at ON news(status, published_at);
CREATE INDEX idx_products_status_featured ON products(status, featured);
CREATE INDEX idx_orders_status_created_at ON orders(status, created_at);
CREATE INDEX idx_users_active_created_at ON users(is_active, created_at);

-- =============================================================================
-- SCHEMA COMPLETE
-- =============================================================================