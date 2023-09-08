import '../../src/NotFound.css'
function NotFound() {
  return (
    <>
      <div className="anchor"></div>
      <div className="container">
        <h1 className="headline">
          <span className="border border--top" data-tx="-40" data-ty="20" data-r="-20"></span>
          <span className="border border--right" data-tx="-10" data-ty="10" data-r="30"></span>
          <span className="border border--bottom" data-tx="60" data-ty="0" data-r="40"></span>
          <span className="border border--left" data-tx="50" data-ty="-80" data-r="20"></span>
          <span className="letter" data-tx="-80" data-ty="-40" data-r="10">4</span>
          <span className="letter" data-tx="-20" data-ty="50" data-r="-50">0</span>
          <span className="letter" data-tx="50" data-ty="100" data-r="20">4</span>
          <span className="letter" data-tx="-30" data-ty="-100" data-r="-40">E</span>
          <span className="letter" data-tx="20" data-ty="-20" data-r="5">r</span>
          <span className="letter" data-tx="80" data-ty="40" data-r="80">r</span>
        </h1>
      </div>
    </>
  )
}

export default NotFound