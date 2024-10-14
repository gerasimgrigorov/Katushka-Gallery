export default function PaintingsGrid({children}){
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-6 2xl:gap-2 2xl:mx-12 px-2 sm:px-4 xl:px-14">
      {children}
    </div>
  )
}