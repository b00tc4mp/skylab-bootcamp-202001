function Telemetry(){
    
    return<>
    <section className="telemetria">
    <div><p>Pitch</p><p>{pitch}</p></div>
    <div><p>Roll</p><p>{roll}</p></div>
    <div><p>Yaw</p><p>{yaw}</p></div>
    <div><p>V en X</p><p>{vgx}</p></div>
    <div><p>V en Y</p><p>{vgy}</p></div>
    <div><p>V en Z</p><p>{vgz}</p></div>
    <div><p>Temp min</p><p>{templ}</p></div>
    <div><p>Temp max</p><p>{temph}</p></div>
    <div><p>Tof</p><p>{tof}</p></div>
    <div><p>Altura</p><p>{h}</p></div>
    <div><p>Bateria</p><p>{bat}</p></div>
    <div><p>Barometro</p><p>{baro}</p></div>
    <div><p>Tiempo de vuelo</p><p>{time}</p></div>
    <div><p>AC en X</p><p>{agx}</p></div>
    <div><p>AC en Y</p><p>{agy}</p></div>
    <div><p>AC en Z</p><p>{agz}</p></div>
  </section>
  </>
}