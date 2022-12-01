import React, { useState } from 'react';

import DeletarNotaComponent from "./DeletarNotaComponent"

const PegarMesComponent = () => {

    // -------------------------------------------------------------------------------------------------------------------- //

    let [listaTodosValores, setlistaTodosValores] = useState([{ Dia: "Teste", Email: "teste@com.br", Nota: "Teste" }])

    let corpoRequisicaoPegarMes = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_da_empressa: "teste@com.br" })
    }

    async function PegarTudoMesComEmail() {
        await fetch('http://127.0.0.1:5000/todomes', corpoRequisicaoPegarMes)
            .then((response) => response.json())
            .then((data) => setlistaTodosValores(data))

        console.log(listaTodosValores)
    }
    // -------------------------------------------------------------------------------------------------------------------- //

    const [valorDia, setValorDia] = useState("01012000");
    const [valorNota, setValorNota] = useState("")

    let emailEmpressa = "teste@com.br"
    let diamesano = valorDia
    let nota = valorNota;

    let corpoRequisicaoAdicionarDia = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dia_aser_adicionado: diamesano,
            email_da_empressa: emailEmpressa,
            nota_do_dia: nota
        })
    }




    async function eventAdicionarDia() {
        await fetch('http://127.0.0.1:5000/AdicionarDia', corpoRequisicaoAdicionarDia)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .finally(console.log("Valores adicionado na tabela"));

        PegarTudoMesComEmail()
    }






    const eventPuxarInputsDias = Event => {
        console.log("Valores dias mudados")
        setValorDia(Event.target.value)

        // console.log(this.diaAdicionado.value)
    }

    const eventPuxarInputsNotas = Event => {
        console.log("Valores de nota mudados")
        setValorNota(Event.target.value)

        // console.log(this.diaAdicionado.value)
    }

    // -------------------------------------------------------------------------------------------------------------------- //
    return (

        <div>
            <button onLoad={PegarTudoMesComEmail}>Pegar todo Mes</button>

            <div >
                <form >
                    <label>DIA:
                        <input
                            type="text"
                            value={valorDia}
                            onChange={eventPuxarInputsDias}
                        />
                    </label>

                    <label>NOTA:
                        <input
                            type="text"
                            value={valorNota}
                            onChange={eventPuxarInputsNotas}
                        />
                    </label>

                </form>
                <button onClick={eventAdicionarDia} >Adicionar ao novo no Mes</button>
                <div>
                    {listaTodosValores.map(
                        notaDeleteComp => <DeletarNotaComponent dia={notaDeleteComp.Dia} email={notaDeleteComp.Email} notaDia={notaDeleteComp.Nota} funcaoAtulizarValores={PegarTudoMesComEmail} />)}

                </div>
            </div>


        </div>
    )
}

export default PegarMesComponent;