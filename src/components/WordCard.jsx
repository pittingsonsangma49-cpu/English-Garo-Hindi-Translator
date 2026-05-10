import PropTypes from 'prop-types'

const classifierStyles = {
  mang: 'bg-[#10B981]/15 text-[#10B981]',
  sak: 'bg-[#3B82F6]/15 text-[#3B82F6]',
  gong: 'bg-[#F59E0B]/15 text-[#F59E0B]',
  king: 'bg-[#8B5CF6]/15 text-[#C084FC]',
  ge: 'bg-slate-700/80 text-slate-200'
}

export default function WordCard({ english, garo, hindi, classifier }) {
  const badgeClass = classifierStyles[classifier] || classifierStyles.ge

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#334155] bg-[#1E293B] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#10B981]">
      <span className={`absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
        {classifier}
      </span>
      <h3 className="text-xl font-semibold text-white mb-3">{english}</h3>
      <p className="text-[#34D399] text-lg font-semibold mb-2">{garo}</p>
      <p className="text-[#FCD34D] text-sm">{hindi}</p>
    </div>
  )
}

WordCard.propTypes = {
  english: PropTypes.string.isRequired,
  garo: PropTypes.string.isRequired,
  hindi: PropTypes.string.isRequired,
  classifier: PropTypes.string.isRequired,
}
