import { useState } from "react";
import vagalist from "../data/vaga.js";
import VagaCard from "./VagaCard.jsx";

function Vagas() {
  const [tiposSelecionados, setTiposSelecionados] = useState([]);
  const [areasSelecionadas, setAreasSelecionadas] = useState([]);
  const [locaisSelecionados, setLocaisSelecionados] = useState([]);

  function toggleFiltro(valor, lista, setLista) {
    if (lista.includes(valor)) {
      setLista(lista.filter((item) => item !== valor));
    } else {
      setLista([...lista, valor]);
    }
  }

  function limparFiltros(e) {
    e.preventDefault();
    setTiposSelecionados([]);
    setAreasSelecionadas([]);
    setLocaisSelecionados([]);
  }

  const bateComLista = (valorVaga, selecionados) => {
    if (selecionados.length === 0) return true;
    if (!valorVaga) return false;
    const valorLimpo = String(valorVaga).trim().toLowerCase();
    return selecionados.some(
      (item) => String(item).trim().toLowerCase() === valorLimpo
    );
  };

  const vagasFiltradas = vagalist.filter((vaga) => {
    const bateTipo = bateComLista(vaga.tipo, tiposSelecionados);
    const bateArea = bateComLista(vaga.area, areasSelecionadas);
    const bateLocal = bateComLista(vaga.localizacao, locaisSelecionados);

    return bateTipo && bateArea && bateLocal;
  });

  return (
    <>
      <main>
        <div className="conteudo__header">
          <h2>Últimas vagas</h2>
          <span>{vagasFiltradas.length} vagas - atualizado agora</span>
        </div>

        {vagasFiltradas.length === 0 ? (
          <p>Nenhuma vaga encontrada</p>
        ) : (
          vagasFiltradas.map((vaga) => (
            <VagaCard
              id={vaga.id}
              key={vaga.id}
              empresa={vaga.empresa}
              cargo={vaga.cargo}
              salario={vaga.salario}
              modelo={vaga.modelo}
              tempo={vaga.tempo}
            />
          ))
        )}
      </main>

      <aside>
        <div className="conteudo__header">
          <h3>Filtros</h3>
          <a id="btn-limpar" href="" onClick={limparFiltros}>
            limpar
          </a>
        </div>

        <div className="conteudo__filter">
          <p>Tipo de vaga</p>
          <label htmlFor="ck-efetivo">
            <input
              className="filtro"
              type="checkbox"
              id="ck-efetivo"
              checked={tiposSelecionados.includes("Efetivo")}
              onChange={() =>
                toggleFiltro("Efetivo", tiposSelecionados, setTiposSelecionados)
              }
            />{" "}
            Efetivo
          </label>
          <label htmlFor="ck-estagio">
            <input
              className="filtro"
              type="checkbox"
              id="ck-estagio"
              checked={tiposSelecionados.includes("Estágio")}
              onChange={() =>
                toggleFiltro("Estágio", tiposSelecionados, setTiposSelecionados)
              }
            />{" "}
            Estágio
          </label>
          <label htmlFor="ck-meio">
            <input
              className="filtro"
              type="checkbox"
              id="ck-meio"
              checked={tiposSelecionados.includes("Meio período")}
              onChange={() =>
                toggleFiltro(
                  "Meio período",
                  tiposSelecionados,
                  setTiposSelecionados
                )
              }
            />{" "}
            Meio período
          </label>
        </div>

        <div className="conteudo__filter">
          <p>Área</p>
          <label htmlFor="ck-engenharia">
            <input
              className="filtro"
              type="checkbox"
              id="ck-engenharia"
              checked={areasSelecionadas.includes("Engenharia")}
              onChange={() =>
                toggleFiltro("Engenharia", areasSelecionadas, setAreasSelecionadas)
              }
            />{" "}
            Engenharia
          </label>
          <label htmlFor="ck-design">
            <input
              className="filtro"
              type="checkbox"
              id="ck-design"
              checked={areasSelecionadas.includes("Design")}
              onChange={() =>
                toggleFiltro("Design", areasSelecionadas, setAreasSelecionadas)
              }
            />{" "}
            Design
          </label>
          <label htmlFor="ck-gestao">
            <input
              className="filtro"
              type="checkbox"
              id="ck-gestao"
              checked={areasSelecionadas.includes("Gestão")}
              onChange={() =>
                toggleFiltro("Gestão", areasSelecionadas, setAreasSelecionadas)
              }
            />{" "}
            Gestão
          </label>
        </div>

        <div className="conteudo__filter">
          <p>Localização</p>
          <label htmlFor="ck-sp">
            <input
              className="filtro"
              type="checkbox"
              id="ck-sp"
              checked={locaisSelecionados.includes("São Paulo")}
              onChange={() =>
                toggleFiltro(
                  "São Paulo",
                  locaisSelecionados,
                  setLocaisSelecionados
                )
              }
            />{" "}
            São Paulo
          </label>
          <label htmlFor="ck-sc">
            <input
              className="filtro"
              type="checkbox"
              id="ck-sc"
              checked={locaisSelecionados.includes("Santa Catarina")}
              onChange={() =>
                toggleFiltro(
                  "Santa Catarina",
                  locaisSelecionados,
                  setLocaisSelecionados
                )
              }
            />{" "}
            Santa Catarina
          </label>
          <label htmlFor="ck-rs">
            <input
              className="filtro"
              type="checkbox"
              id="ck-rs"
              checked={locaisSelecionados.includes("Rio Grande do Sul")}
              onChange={() =>
                toggleFiltro(
                  "Rio Grande do Sul",
                  locaisSelecionados,
                  setLocaisSelecionados
                )
              }
            />{" "}
            Rio Grande do Sul
          </label>
        </div>
      </aside>
    </>
  );
}

export default Vagas;