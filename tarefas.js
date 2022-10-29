let tarefas = Array()
var alerta = document.getElementById('alert')

function marcarTarefa() {
    let marcados = document.getElementsByName('item')
    let marcar = document.getElementsByName('lista')
    for ( let l = 0; l < marcados.length; l++) {
        if(marcados[l].checked) {
            marcar[l].style.textDecoration = 'line-through'  
        } else {
            marcar[l].style.textDecoration = 'none'
        }
    }
}


function adicionarTarefa() {

    let a = document.getElementById('tarefa').value
    
    if( a === '') {
        alerta.classList.add('alert', 'alert-danger')
        alerta.innerHTML = 'Insira algo válido' 
    } else {
        alerta.innerHTML = ''
        alerta.classList.remove('alert', 'alert-danger')

        tarefas.unshift(a)
        let len = tarefas.length
        text = '<ul>'
        
        for(let i = 0; i < len; i++) {
            x = `<input type="checkbox" name="item" id=${i} value = ${i} class = "itens" onclick="marcarTarefa()">`
            text+= `<li name="lista" value=${i}>` + x + tarefas[i]  + '</li>' 
        }
        
        text += '</ul>'
        document.getElementById('novas_tarefas').innerHTML = text 
        a = document.getElementById('tarefa').value = ''
        
    }

    marcarTarefa()
}

function removerTarefa() {

    if(tarefas == '') {
        alerta.classList.add('alert', 'alert-danger')
        alerta.innerHTML = 'Nenhuma tarefa adicionada'
    } else {
        alerta.innerHTML = ''
        alerta.classList.remove('alert', 'alert-danger')

        //obter os input checkbox
        let marcados = document.getElementsByName('item')
        let len = tarefas.length

        //criar arrays dos itens que vão ser removidos e mantidos
        let array_remover = []
        let array_manter = []
        
        //checar quais checkbox estão marcadas
        for ( let l = 0; l < marcados.length; l++) {
            //recuperando o valor das que tão checadas
            if(marcados[l].checked) {
                v = marcados[l].value = tarefas[l]
                
                //adicionar os itens checados ao array de remoção
                array_remover.unshift(v)
                array_remover[l]
            
            //recuperando o valor das que não estão checadas
            } else {
                k = marcados[l].value = tarefas[l]

                array_manter.unshift(k)
                array_manter[l]
            }
            
        }
        
        if(array_remover == '') {
            alerta.classList.add('alert', 'alert-danger')
            alerta.innerHTML = 'Nenhuma tarefa selecionada'
        } else {
            alerta.innerHTML = ''
            alerta.classList.remove('alert', 'alert-danger')

            function remover(elemento) {
                tarefas.splice(elemento)
            }
            array_remover.forEach(remover)

            function manter(elemento2) {
                tarefas.unshift(elemento2)
            }
            array_manter.forEach(manter)
            
            len = tarefas.length
            text = '<ul>'
            for(let i = 0; i < len; i++) {
                y = `<input type="checkbox" name="item" id=${i} value = ${i} class = "itens" onclick="marcarTarefa()">`
                text+= `<li name="lista" value=${i}>` + y + tarefas[i]  + '</li>'
                
            }
            text += '</ul>'
            document.getElementById('novas_tarefas').innerHTML = text

            alerta.classList.add('alert', 'alert-success')
            if(array_remover.length > 1) {
                alerta.innerHTML = 'Tarefas removidas com sucesso!'
            } else {
                alerta.innerHTML = 'Tarefa removida com sucesso!'
            }
            
        }
        
        
    }
        
    marcarTarefa()
}

//MARCANDO TAREFAS
