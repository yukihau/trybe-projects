# Boas-vindas ao repositório do projeto `Algorithms`!

Para realizar o projeto, atente-se a cada passo descrito a seguir, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

# Termos e acordos

Ao iniciar este projeto, você concorda com as diretrizes do Código de Conduta e do Manual da Pessoa Estudante da Trybe.

# Entregáveis

<details>
  <summary><strong>🤷🏽‍♀️ Como entregar</strong></summary><br />

  Para entregar o seu projeto você deverá criar um *Pull Request* neste repositório.

  Lembre-se que você pode consultar nosso conteúdo sobre [Git & GitHub](https://app.betrybe.com/course/4d67f5b4-34a6-489f-a205-b6c7dc50fc16/) e nosso [Blog - Git & GitHub](https://blog.betrybe.com/tecnologia/git-e-github/) sempre que precisar!
</details>

<details>
  <summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary><br />


  Neste projeto você irá resolver problemas e otimizar algoritmos desenvolvendo a sua capacidade de implementar soluções para os mais diversos problemas do dia a dia!
  
  🚵 Habilidades exercitadas:
  
Lógica;

Capacidade de interpretação de problemas;

Capacidade de interpretação de um código legado;

Capacidade de otimizar a resolução de problemas e;

Resolver problemas/Otimizar algoritmos sob pressão.

</details>

<details>
  <summary><strong>🗓 Data de Entrega</strong></summary><br />
  
  * Este projeto é `individual`;
  * São `2` dias de projeto;
  * Data para entrega final do projeto: `04/08/2022 14:00`.

</details>

# Orientações
<details>
  <summary><strong>⚠️ Antes de começar a desenvolver</strong></summary><br />

  1. Clone o repositório

  - Use o comando: `git clone git@github.com:tryber/sd-015-b-project-algorithms.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd sd-015-b-project-algorithms`

  2. Crie o ambiente virtual para o projeto

  - `python3 -m venv .venv && source .venv/bin/activate`

  3. Instale as dependências

  - `python3 -m pip install -r dev-requirements.txt`
  
  4. Crie uma branch a partir da branch `master`

  - Verifique que você está na branch `master`
    - Exemplo: `git branch`
  - Se não estiver, mude para a branch `master`
    - Exemplo: `git checkout master`
  - Crie uma branch à qual você vai submeter os `commits` do seu projeto
    - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    - Exemplo: `git checkout -b joaozinho-sd-015-b-project-algorithms`

  5. Adicione as mudanças ao _stage_ do Git e faça um `commit`

  - Verifique que as mudanças ainda não estão no _stage_
    - Exemplo: `git status` (deve aparecer listada a pasta _joaozinho_ em vermelho)
  - Adicione o novo arquivo ao _stage_ do Git
    - Exemplo:
      - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
      - `git status` (deve aparecer listado o arquivo _joaozinho/README.md_ em verde)
  - Faça o `commit` inicial
    - Exemplo:
      - `git commit -m 'iniciando o projeto x'` (fazendo o primeiro commit)
      - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

  6. Adicione a sua branch com o novo `commit` ao repositório remoto

  - Usando o exemplo anterior: `git push -u origin joaozinho-sd-015-b-project-algorithms`

  7. Crie um novo `Pull Request` _(PR)_

  - Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-015-b-project-algorithms/pulls)
  - Clique no botão verde _"New pull request"_
  - Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  - Coloque um título para a sua _Pull Request_
    - Exemplo: _"Cria tela de busca"_
  - Clique no botão verde _"Create pull request"_
  - Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  - **Não se preocupe em preencher mais nada por enquanto!**
  - Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-015-b-project-algorithms/pulls) e confira que o seu _Pull Request_ está criado

</details>

<details>
  <summary><strong>⌨️ Durante o desenvolvimento</strong></summary><br />

  - Faça `commits` das alterações que você fizer no código regularmente

  - Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

  - Os comandos que você utilizará com mais frequência são:
    1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
    2. `git add` _(para adicionar arquivos ao stage do Git)_
    3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
    4. `git push -u origin nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
    5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

</details>

<details>
  <summary><strong>🧱 Estrutura do Projeto</strong></summary><br />

  Este repositório é composto pela pasta `challenges` que contém todos os arquivos que você utilizará neste projeto.

  Cada arquivo `.py`, dentro da pasta `challenges` representa um requisito. Ou seja, os arquivos não tem ligação uns com os outros. Logo, os problemas devem ser resolvidos de forma separada.

  Este repositório já contém um _template_ com a estrutura de diretórios e arquivos, tanto de código quanto de teste criados. Veja abaixo:

  ```
  .
  ├── challenges
  │   ├──🔹 challenge_anagrams.py
  │   ├──🔹 challenge_find_the_duplicate.py
  │   ├──🔹 challenge_palindromes_iterative.py
  │   ├──🔹 challenge_palindromes_recursive.py
  │   └──🔹 challenge_study_schedule.py
  ├──tests
  │   ├──🔸 test_anagrams.py
  │   ├──🔸 test_find_the_duplicate.py
  │   ├──🔸 test_palindromes_iterative.py
  │   └──🔸 test_palindromes_recursive.py
  │   └──🔸 test_test_study_schedule.py
  ├──🔸 dev-requirements.txt
  ├──🔸 pyproject.toml
  ├──🔸 README.md
  ├──🔸 requirements.txt
  ├──🔸 setup.cfg
  ├──🔸 setup.py
  └──🔸 trybe.yml

Legenda:
  🔸 Arquivos que não podem ser alterados.
  🔹 Arquivos a serem alterados para realizar os requisitos.
```

  Na estrutura deste _template_, você deve implementar as funções necessárias. Novos arquivos e funções podem ser criados conforme a necessidade da sua implementação, porém não remova arquivos já existentes.

</details>

<details>
  <summary><strong>🎛 Linter</strong></summary><br />

  Para garantir a qualidade do código, vamos utilizar neste projeto o linter `Flake8`.
  Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível
  e de fácil manutenção! Para rodá-lo localmente no projeto, execute o comando abaixo:

  ```bash
  python3 -m flake8
  ```

  ⚠️ **PULL REQUESTS COM ISSUES DE LINTER NÃO SERÃO AVALIADAS. ATENTE-SE PARA RESOLVÊ-LAS ANTES DE FINALIZAR O DESENVOLVIMENTO!** ⚠️
</details>

<details>
  <summary><strong>🏕️ Ambiente Virtual</strong></summary><br />
  O Python oferece um recurso chamado de ambiente virtual que permite sua máquina rodar, sem conflitos, diferentes tipos de projetos com diferentes versões de bibliotecas.

  1. **criar o ambiente virtual**

  ```bash
  $ python3 -m venv .venv
  ```

  2. **ativar o ambiente virtual**

  ```bash
  $ source .venv/bin/activate
  ```

  3. **instalar as dependências no ambiente virtual**

  ```bash
  $ python3 -m pip install -r dev-requirements.txt
  ```

  Com o seu ambiente virtual ativo, as dependências serão instaladas neste ambiente.
  :eyes: Caso precise desativar o ambiente virtual, execute o comando "deactivate". 
  :warning: Lembre-se de ativar novamente quando voltar a trabalhar no projeto.

  O arquivo `dev-requirements.txt` contém todas as dependências que serão utilizadas no projeto, ele está agindo como se fosse um `package.json` de um projeto `Node.js`.
</details>

<details>
  <summary><strong>🛠 Testes</strong></summary><br />

  Para executar os testes certifique-se de que você está com o ambiente virtual ativado.

  <strong>Executar os testes</strong>

  ```bash
  $ python3 -m pytest
  ```

  O arquivo `pyproject.toml` já configura corretamente o pytest. Entretanto, caso você tenha problemas com isso e queira explicitamente uma saída completa, o comando é:

  ```bash
  python3 -m pytest -s -vv
  ```

  Caso precise executar apenas um arquivo de testes basta executar o comando:

  ```bash
  python3 -m pytest tests/nomedoarquivo.py
  ```

  Caso precise executar apenas uma função de testes basta executar o comando:

  ```bash
  python3 -m pytest -k nome_da_func_de_tests
  ```

  Se desejar rodar os testes de um arquivo específico, execute com `-x nome_do_arquivo`

  ```bash
  pytest -x tests/test_jobs.py
  ```
  
  Para executar um teste específico de um arquivo, basta executar o comando:

  ```bash
  pytest -x tests/nomedoarquivo.py::test_nome_do_teste
  ```

  Se quiser saber mais sobre a instalação de dependências com `pip`, veja esse [artigo](https://medium.com/python-pandemonium/better-python-dependency-and-package-management-b5d8ea29dff1).
</details>

<details>
  <summary><strong>🤝 Depois de terminar o desenvolvimento (opcional)</strong></summary><br />

  Para sinalizar que o seu projeto está pronto para o _"Code Review"_, faça o seguinte:

  - Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas:

    - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**;

    - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**;

    - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-015-b`.

  Caso tenha alguma dúvida veja este [video explicativo](https://vimeo.com/362189205).

</details>

<details>
  <summary><strong>🕵🏿 Revisando um pull request</strong></summary><br />

  Use o conteúdo sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os _Pull Requests_.
</details>

<details>
  <summary><strong>🗣 Nos dê feedbacks sobre o projeto!</strong></summary><br />

Ao finalizar e submeter o projeto, não se esqueça de avaliar sua experiência preenchendo o formulário. 
**Leva menos de 3 minutos!**

[FORMULÁRIO DE AVALIAÇÃO DE PROJETO](https://be-trybe.typeform.com/to/ZTeR4IbH)

</details>

<details>
  <summary><strong>🗂 Compartilhe seu portfólio!</strong></summary><br />

  Agora que você finalizou os requisitos, chegou a hora de mostrar ao mundo que você aprendeu algo novo! 🚀

   Siga esse [**guia que preparamos com carinho**](https://app.betrybe.com/course/career/personal_portfolio/utilizando-projetos-feitos-na-trybe/d7ca7f50-0a8f-4b10-b360-cfcb454d832a) para disponibilizar o projeto finalizado no seu GitHub pessoal.

   Esse passo é super importante para ganhar mais visibilidade no mercado de trabalho, mas também é útil para manter um back-up do seu trabalho.

   E você sabia que o LinkedIn é a principal rede social profissional e compartilhar o seu aprendizado lá é muito importante para quem deseja construir uma carreira de sucesso? Compartilhe esse projeto no seu LinkedIn, marque o perfil da Trybe (@trybe) e mostre para a sua rede toda a sua evolução.

</details>

# Requisitos Obrigatórios

## 1 - Número de estudantes estudando no mesmo horário (Algoritmo de busca)

Você trabalha na maior empresa de educação do Brasil. Certo dia, a pessoa Product Manager `(PM)` quer saber qual horário tem a maior quantidade de pessoas estudantes acessando o conteúdo da plataforma. Com esse dado em mãos, a pessoa PM saberá qual é o melhor horário para disponibilizar os materiais de estudo para ter o maior engajamento possível.

O horário de entrada e saída do sistema é cadastrado no banco de dados toda vez que uma pessoa estudante entra e sai do sistema. Esses dados estarão contidos em uma lista de tuplas (`permanence_period`) em que cada tupla representa o período de permanência de uma pessoa estudante no sistema com seu horário de entrada e de saída.

Seu trabalho é descobrir qual o melhor horário para disponibilizar os conteúdos de estudo. Para isso, utilize a estratégia de resolução de problemas chamada `força bruta` em que a função desenvolvida por você será chamada várias vezes com valores diferentes para a variável `target_time` e serão analisados os retornos da função.

:eyes: _De olho na Dica:_ O melhor horário será aquele no qual o contador retornado pela função for o maior

<details>
 <summary>
   <b>Clique aqui para ver um exemplo.</b>
 </summary>

```md
# Nos arrays temos 6 estudantes

# estudante             1       2       3       4       5       6
permanence_period = [(2, 2), (1, 2), (2, 3), (1, 5), (4, 5), (4, 5)]

target_time = 5  # saída: 3, pois a quarta, a quinta e a sexta pessoa estudante ainda estavam estudando nesse horário.
target_time = 4  # saída: 3, pois a quinta e a sexta pessoa estudante começaram a estudar nesse horário e a quarta ainda estava estudando.
target_time = 3  # saída: 2, pois a terceira e a quarta pessoa estudante ainda estavam estudando nesse horário.
target_time = 2  # saída: 4, pois a primeira, a segunda, a terceira e a quarta pessoa estudante estavam estudando nesse horário.
target_time = 1  # saída: 2, pois a segunda e a quarta pessoa estudante estavam estudando nesse horário.

Para esse exemplo, depois de rodar a função para todos esses `target_times`, julgamos que o melhor horário é o `2`, pois esse retornou `4`, já que 4 estudantes estavam presentes nesse horário!
```

</details>

- Este requisito será testado executando 10.000 vezes sobre uma mesma entrada. Tais execuções **no avaliador** devem acontecer integralmente em menos de 0.02 segundos. O tempo de execução do código na sua máquina pode variar em relação ao avaliador, então é importante levar somente ele em consideração. :eyes: _De olho na Dica:_ Use um algoritmo de, no máximo, complexidade `O(n)`.

- O algoritmo deve utilizar a solução iterativa;

- Caso o `target_time` passado seja nulo, o valor retornado pela função deve ser `None` (considere o horário 0 como um horário válido);

- O código deve ser feito dentro do arquivo `challenges/challenge_study_schedule.py`.

<details>
 <summary>
   <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
 </summary>

- 1.1 - Retorne a quantidade de estudantes presentes para uma entrada específica;

- 1.2 - Retorne `None` se em `permanence_period` houver alguma entrada inválida;

- 1.3 - Retorne `None` se  `target_time` recebe um valor vazio;

- 1.4 - A função poderá, em menos de 0.02s, ser executada 10.000 vezes para uma entrada pequena (tempo da execução do avaliador no Pull Request).

</details>

## 2 - Palíndromos (Recursividade)

Escreva uma função que irá determinar se uma palavra é um palíndromo ou não. A função irá receber uma string de parâmetro e o retorno será um _booleano_, `True` ou `False`.

Mas o que é um palíndromo?

> Um palíndromo é uma palavra, frase ou número que mantém seu sentido mesmo sendo lido de trás para frente. Por exemplo, `"ABCBA"`. 

:warning: Neste projeto iremos focar somente em **palavras palíndromas** e não em frases ou números.

<details>
 <summary>
   <b>Clique aqui para ver um exemplo.</b>
 </summary>

```md
word = "ANA"
# saída: True

word = "SOCOS"
# saída: True

word = "REVIVER"
# saída: True

word = "COXINHA"
# saída: False

word = "AGUA"
# saída: False
```

</details>

- O algoritmo deve ser feito utilizando a solução recursiva;

- Não se preocupe com a análise da complexidade desse algoritmo;

- Se for passado uma _string_ vazia, retorne `False`;

- O código deve ser feito dentro do arquivo `challenges/challenge_palindromes_recursive.py`.

<details>
 <summary>
   <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
 </summary>

- 2.1 - Retorne `True` se a palavra passada por parâmetro for um palíndromo;

- 2.2 - Retorne `False` se a palavra passada por parâmetro não for um palíndromo;

- 2.3 - Retorne `False` se nenhuma palavra for passada por parâmetro.

</details>

## 3 - Anagramas (Algoritmo de ordenação)

Faça um algoritmo que consiga comparar duas _strings_ e identificar se uma é um anagrama da outra. Ou seja, sua função irá receber duas strings de parâmetro e o retorno da função será um _booleano_, `True` ou `False`.

O algoritmo deve considerar letras _maiúsculas_ e _minúsculas_ como iguais durante a comparação das entradas, ou seja, ser _case insensitive_. 

Mas o que é um anagrama?

> "Um anagrama é uma espécie de jogo de palavras criado com a reorganização das letras de uma palavra ou expressão para produzir outras palavras ou expressões, utilizando todas as letras originais exatamente uma vez."

<details>
 <summary>
   <b>Clique aqui para ver um exemplo.</b>
 </summary>

```md
first_string = "amor"
second_string = "roma"
# saída: True
# Explicação: Nesse caso o retorno da função é True, pois a palavra "roma" é um anagrama de "amor".


first_string = "pedra"
second_string = "perda"
# saída: True
# Explicação: Nesse caso o retorno também é True. Na palavra "pedra", trocamos o "d" de lugar com o "r" e formamos "perda", sendo assim um anagrama.  


first_string = "pato"
second_string = "tapo"
# saída: True


first_string = "Amor"
second_string = "Roma"
# saída: True
# Explicação: Nesse caso o retorno da função é True, pois a palavra "Roma" é um anagrama de "Amor" independente da letra "R" e "A" serem maiúsculas.


# Agora vamos pra um exemplo em que não existe um anagrama
first_string = "coxinha"
second_string = "empada"
# saída: False
```

</details>

- Este requisito será testado executando 10.000 vezes sobre uma mesma entrada. Tais execuções **no avaliador** devem acontecer integralmente em menos de 2 segundos. O tempo de execução do código na sua máquina pode variar em relação ao avaliador, então é importante levar somente ele em consideração. **:eyes: De olho na dica:** use um algoritmo de, no máximo, complexidade `O(n log n)`;

- Utilize qualquer algoritmo que quiser (_Selection sort_, _Insertion sort_, _Bubble sort_, _Merge sort_, _Quick sort_ ou _TimSort_), desde que atinja a complexidade `O(n log n)`. Ou seja, preste bastante atenção na escolha do algoritmo e na implementação do mesmo; :warning: **Você deverá implementar sua própria função de ordenação*, ou seja, o uso de funções prontas não é permitido.** **Exemplos de funções não permitidas:** _*sort*, *sorted* e *Counter*_;

- A função retorna `True` caso uma _string_ **seja** um anagrama da outra independente se as letras são maiúsculas ou minúsculas;

- A função retorna `False` caso uma _string_ **não seja** um anagrama da outra;

- O código deve ser feito dentro do arquivo `challenges/challenge_anagrams.py`.

<details>
 <summary>
   <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
 </summary>

- 3.1 - Retorne `True` se as palavras passadas por parâmetro forem anagramas;

- 3.2 - Retorne `False` se as palavras passadas por parâmetro não forem anagramas;

- 3.3 - Retorne `False` se alguma das palavras passadas por parâmetro for uma string vazia;

- 3.4 - Execute a função, somando 10.000 execuções para uma entrada pequena, em menos que 8.2s (tempo da execução do avaliador no Pull Request);

- 3.5 - Retorne `True` se as palavras passadas forem anagramas sem diferenciar maiúsculas e minúsculas.

</details>

---

# Requisitos Bônus

## 4 - Encontrando números repetidos (Algoritmo de busca)

Dada um _array_ de números inteiros contendo `n + 1` inteiros, chamado de `nums`, em que cada inteiro está no intervalo `[1, n]`.

Retorne apenas um número duplicado em `nums`.

<details>
 <summary>
   <b>Clique aqui para ver um exemplo.</b>
 </summary>

```md
nums = [1, 3, 4, 2, 2]
# saída: 2

nums = [3, 1, 3, 4, 2]
# saída: 3

nums = [1, 1]
# saída: 1

nums = [1, 1, 2]
# saída: 1

nums = [3, 1, 2, 4, 6, 5, 7, 7, 7, 8]
# saída: 7
```

</details>

- Caso não passe nenhum valor ou uma string ou não houver números repetidos retorne `False`;

- Este requisito será testado executando 10.000 vezes sobre uma mesma entrada. Tais execuções **no avaliador** devem acontecer integralmente em menos de 0.01 segundos. O tempo de execução do código na sua máquina pode variar em relação ao avaliador, então é importante levar somente ele em consideração. :eyes: **De olho na Dica:** use um algoritmo de, no máximo, complexidade `O(n log n)`.

- O array montado deve:

  - Ter apenas números inteiros positivos maiores do que 1;

  - Ter apenas um único número repetindo duas ou mais vezes, todos os outros números devem aparecer apenas uma vez;

  - Ter, no mínimo, dois números.

- O código deve ser feito dentro do arquivo `challenge_find_the_duplicate.py`.

:eyes: **De olho na Dica:** ordene o array.

<details>
 <summary>
   <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
 </summary>

- 4.1 - Retorne o número repetivo se a função receber como parâmetro uma lista com números repetidos;

- 4.2 - Retorne `False` se a função não receber nenhum parâmetro;

- 4.3 - Retorne `False` se a função receber como parâmetro uma string;

- 4.4 - Retorne `False` se a função receber como parâmetro uma lista sem números repetidos;

- 4.5 - Retorne `False` se a função receber como parâmetro apenas um valor;

- 4.6 - Retorne `False` se a função receber como parâmetro um número negativo;

- 4.7 - Execute a função, somando 10.000 execuções para uma entrada pequena, em menos que 0.01s (tempo da execução do avaliador no Pull Request).

</details>

## 5 - Palíndromos (Iteratividade)

Resolva o mesmo problema apresentado no `requisito 2 - Palíndromos`, porém dessa vez utilizando a solução iterativa.

- Este requisito será testado executando 10.000 vezes sobre uma mesma entrada. Tais execuções **no avaliador** devem acontecer integralmente em menos de 0.005 segundos. O tempo de execução do código na sua máquina pode variar em relação ao avaliador, então é importante levar somente ele em consideração. :eyes: **De olho na Dica:** use um algoritmo de, no máximo, complexidade `O(n)`.

- O algoritmo deve utilizar a solução iterativa;

- O código deve ser feito dentro do arquivo `challenge_palindromes_iterative.py`.

<details>
 <summary>
   <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
 </summary>

- 5.1 - Retorne `True` se a palavra passada como parâmetro for um palíndromo, executando uma função iterativa;

- 5.2 - Retorne `True` se a palavra passada como parâmetro for um palíndromo, executando uma função iterativa;

- 5.3 - Retorne `False` se nenhuma palavra for passada como parâmetro, executando uma função iterativa ;

- 5.4 - Execute a função, somando 10.000 execuções para uma entrada pequena, em menos que 0.005s (tempo da execução do avaliador no Pull Request).

</details>

---
