export default function NewsCardSkeleton({ compact }) {
  return (
    <div
      className={`block p-2 transition-all duration-300 animate-pulse `}
    >
      {/* Imagen simulada */}
      <div className="w-full aspect-video bg-gray-300 mb-2 rounded" />

      {/* Título */}
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />

      {/* Descripción */}
      {!compact && (
        <>
          <div className="h-4 bg-gray-300 rounded w-full mb-1" />
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-3" />
        </>
      )}

      {/* Fecha y fuente simuladas */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="h-3 bg-gray-300 rounded w-1/4" />
        <div className="h-3 bg-gray-300 rounded w-1/6" />
      </div>
    </div>
  );
}
