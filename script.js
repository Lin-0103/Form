/* classe construtora para abjetos de registro */
class Register {
  constructor(nome, email, tel, cep, rua, n_casa, comp, bairro, cidade, estado, data) {
    this.nome = nome,
    this.email = email,
    this.tel = tel,
    this.cep = cep,
    this.rua = rua,
    this.n_casa = n_casa,
    this.comp = comp,
    this.bairro = bairro,
    this.cidade = cidade,
    this.estado = estado,
    this.data = data;
  }
}

/* Verificar necessidade de Complemento */
document.getElementById('ch_comp').addEventListener('click', function(){

  if(document.getElementById('ch_comp').checked){
    document.getElementById('comp').disabled = false

    document.querySelector('#comp_lb').innerHTML = 'Complemento? <span>*</span>'

  }
  else{
    document.getElementById('comp').disabled = true
    document.getElementById('comp').value = ''
    document.querySelector('#comp_lb').innerHTML = 'Complemento?'
  }
})

/* limpar campos */
function limpar_campos(){
  document.getElementById('nome').value = ''
  document.getElementById('email').value  = ''
  document.getElementById('tel').value = ''
  document.getElementById('cep').value  = ''
  document.getElementById('rua').value = ''
  document.getElementById('n_casa').value = ''
  if(document.getElementById('comp').disabled == false){
  document.getElementById('comp').value = ''
  }
  document.getElementById('bairro').value = ''
  document.getElementById('cidade').value = ''
  document.getElementById('estado').value = ''
}

/* Função para validar os campos inseridos */
function validacao(nome, email, tel, cep, rua, n_casa, bairro, cidade, estado){
    /* Verificando se os campos informados contem valor inserido */
    let alerta = "" /* Cria variavel para armazenar alerta no caso de inputs vazios */

    if(nome === ''){
      alerta += "preencha o Nome. \r\n"
    }
    if (email === ''){
      alerta += "preencha o Email. \r\n"
    }
    if (tel === ""){ 
      alerta += "Preencha o Tel. \r\n" 
    }
    if (cep === ""){
      alerta += "Preencha o email. \r\n" 
    }
    if(rua === ""){
      alerta += "Preencha a rua. \r\n" 
    }
    if (n_casa === ""){
      alerta += "Preencha o numero da casa. \r\n"
    }
    if(document.getElementById('comp').disabled == false & comp === ""){
      alerta += "Preencha o complemento. \r\n"
    }
    if(bairro === ""){
      alerta += "Preencha o bairro. \r\n"
    }
    if (cidade === ""){
      alerta += "Preencha a cidade. \r\n"
    }
    if (estado === ""){
      alerta += "Preencha o estado. \r\n"
    }
    return alerta;
}

/* Verificação de vaores Numericos 
o valor "key" atriduido à função se refere ao resultado da consulta get element by id*/
function not_a_number(key){
  /* Verifica se o valor digitado é um numero */
  if(isNaN(parseInt(key.data))){
    /* se o valor é uma letra atribui o valor de key para o valor para antes da digitação da letra */
   key.target.value = key.target.value.substring(0, key.target.value.length - 1)
 }
}


/* Criação de Array para armazenar dados */
const usuarios = []

/* obter variaveis do formulario e cirar objeto */
function registro() {

  /* obetndo variaveis do Document */
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const tel = document.getElementById('tel').value
  const cep = document.getElementById('cep').value
  const rua = document.getElementById('rua').value
  const n_casa = document.getElementById('n_casa').value
  let comp = 'Não Possui'
  if(document.getElementById('comp').disabled == false){
    comp = document.getElementById('comp').value
  }
  const bairro = document.getElementById('bairro').value
  const cidade = document.getElementById('cidade').value
  const estado = document.getElementById('estado').value
  const data = new Date().toLocaleDateString()

  /* Verificar validação dos dados */
  if (validacao(nome, email, tel, cep, rua, n_casa, bairro, cidade, estado) !== ""){
    alert(validacao(nome, email, tel, cep, rua, n_casa, bairro, cidade, estado))
  }
  else{
    /* criando objeto no caso de todos os dados serem validos*/
    const cadastro = new Register(nome, email, tel, cep, rua, n_casa, comp, bairro, cidade, estado, data)
    /* Armazenar variaveis no array */
    usuarios.push(cadastro)
    insert_table()
    limpar_campos()
  }

}

/* Inserir elementos na tabela */
function insert_table(){
  /* Obtem corpo da tabela */
  const tbody = document.getElementById('tbody')
  /* Reseta a tabela para manter atualizada */
  tbody.innerHTML =''
  /* Consulta cada elemento do array de usuarios */
  for(let usuario of usuarios){
    /* obtem a posição do elemento no array */
    const pos = usuarios.indexOf(usuario)
    /* Craiçao dos elementos necessarios */
    /* tr = local de armazenamento de cada td necessario */
    const tr = document.createElement('tr')
    /* td = elemento que recebe cada informção individualmente */
    const td = document.createElement('td')
    /* criação e atribuição de valores necessarios ao botão de DeleteUser */
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'delete_b')
    /* adiciona um afunção 'onclick' com a posição do elemento na array para que possa ser excluido caso o botão seja acionado */
    deleteButton.setAttribute('onclick', `remove(${pos})`)
    deleteButton.innerHTML = '<p>Deletar</p>'
    /* vincular o botão Delete à td para que seja exibida junto aos dados do usuario */
    td.appendChild(deleteButton)

    /* atribuição do codigo html para tr criado */
    let user_info = `
    <td>${pos + 1}</td>
    <td>${usuario.nome}</td>
    <td>${usuario.email}</td>
    <td>${usuario.tel}</td>
    <td>${usuario.cep}</td>
    <td>${usuario.rua}</td>
    <td>${usuario.n_casa}</td>
    <td>${usuario.comp}</td>
    <td>${usuario.bairro}</td>
    <td>${usuario.cidade}</td>
    <td>${usuario.estado}</td>
    <td>${usuario.data}</td>
    `

    /* definir HTML do elemento tr como criado anteriormente */
    tr.innerHTML += user_info

    /* Vincular td com botão Delete à tr criada o html definido anteriormente  */
    tr.appendChild(td)

    /* vincular elemento tr configurado com informações e botão ao elemento tBody para que possa ser exibido na tabela */
    tbody.appendChild(tr)

  }
}

/* Função excluir usario que sera usada no botão delete
 função recebe um parametro 'pos' que representa a aposião do elemento a ser excluido */
function remove(pos) {
  /* exclui 1 elemento da array a partir da posição 'pos' especificada */
  usuarios.splice(pos, 1)
  /* atualiza a tabela com elemento excluido */
  insert_table()
}

document.getElementById('btn').addEventListener('click', registro)

document.getElementById('tel').addEventListener('input', not_a_number)

document.getElementById('cep').addEventListener('input', not_a_number)

