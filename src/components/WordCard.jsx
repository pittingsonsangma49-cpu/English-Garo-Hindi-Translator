export default function WordCard({ english, garo, hindi, classifier, category }) {
  const getClassifierColor = (classifier) => {
    const colors = {
      mang: 'bg-green-100 text-green-800',
      sak: 'bg-blue-100 text-blue-800',
      gong: 'bg-yellow-100 text-yellow-800',
      king: 'bg-purple-100 text-purple-800',
      ge: 'bg-gray-100 text-gray-800'
    }
    return colors[classifier] || colors.ge
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{english}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassifierColor(classifier)}`}>
          {classifier}
        </span>
      </div>

      <p className="text-[#1B4332] font-medium text-base mb-1">{garo}</p>
      <p className="text-gray-600 text-sm">{hindi}</p>
    </div>
  )
}