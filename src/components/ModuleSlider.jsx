const ModuleSlider = ({ activeModule, setActiveModule }) => {
    const modules = [
      { id: 1, title: "Módulo 1", disabled: false },
      { id: 2, title: "Módulo 2", disabled: false },
      { id: 3, title: "Módulo 3", disabled: true },
      { id: 4, title: "Módulo 4", disabled: true }
    ]
  
    return (
      <div className="modulo-navegacion">
        {modules.map(mod => (
          <button 
            key={mod.id}
            className={`modulo-btn ${activeModule === mod.id ? 'active' : ''} ${mod.disabled ? 'disabled' : ''}`}
            onClick={() => !mod.disabled && setActiveModule(mod.id)}
            disabled={mod.disabled}
          >
            {mod.title}
          </button>
        ))}
      </div>
    )
  }
  export default ModuleSlider