import React from 'react';

export type SpecsSectionProps = {
  title?: string;
  data: [string, string][];
  background?: string;
  sectionClassName?: string;
};

const SpecsSection: React.FC<SpecsSectionProps> = ({
  title = 'Specs',
  data,
  background = 'bg-black',
  sectionClassName = '',
}) => {
  const bgClass = background.startsWith('bg-') ? background : '';
  const bgStyle = !background.startsWith('bg-') ? { background } : undefined;

  return (
    <section
      className={`w-full py-16 px-4 ${bgClass} ${sectionClassName}`}
      style={bgStyle}
      id="specs"
    >
      <div className="max-w-4xl mx-auto">
        {title && <h2 className="text-4xl font-bold text-white mb-10">{title}</h2>}
        <div className="w-full">
          <table className="w-full text-left">
            <tbody>
              {data.map(([label, value], idx) => (
                <tr key={idx} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-6 text-sm md:text-sm text-white/80 font-semibold italic uppercase w-1/3 align-top whitespace-pre-line">
                    {label}
                  </td>
                  <td className="py-4 text-sm md:text-sm text-gray-400 whitespace-pre-line">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection; 