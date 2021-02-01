# Happy

Aplicação WEB desenvolvida inicialmente através do Next Level Week 3.0, curso online gratuito oferecido pelo RocketSeat durante o período de 12 de agosto de 2020 à 16 de agosto de 2020. Foi aprimorado por conta própria com o passar do tempo. Entre os aprimoramentos, temos:

- Autenticação 
- Gerenciamento de Sessão utilizando **JWT**
- Update de dados no backend através de interações do usuário
- Melhor gerenciamento do upload de imagens presentes no cadastro dos orfanatos
- Remoção de orfanatos
- Localização em tempo real
- Entre outras...

## Página inicial

Página inicial do aplicativo para acesso ao mapa contendo os orfanatos e para acesso à parte restrita do sistema.

![Pagina Inicial](https://github.com/aabastos/Happy/blob/master/web/prints/landing.png)

## Mapa

Página que lista, em um mapa, os orfanatos cadastrados (e aprovados) com a sua determinada localização

![Mapa](https://github.com/aabastos/Happy/blob/master/web/prints/map.png)

## Cadastro de Orfanatos

Página para o cadastramento de um orfanato, oferecendo a possibilidade e inserir a localização, nome, sobre, instruções de visita, horário de visita, atendimentos aos finais de semanas e imagens do orfanato.

![Adicionar Orfanato](https://github.com/aabastos/Happy/blob/master/web/prints/add-orphanage-1.png)
![Adicionar Orfanato](https://github.com/aabastos/Happy/blob/master/web/prints/add-orphanage-2.png)

## Cadastro de Orfanatos - Sucesso

Página que é apresentado ao usuário quando o processo de cadastramento do orfanato é feito com sucesso.

![Adicionar Orfanato - Sucesso](https://github.com/aabastos/Happy/blob/master/web/prints/add-orphanage-success.png)

## Detalhes do orfanato

Página que lista os detalhes do orfanato, tais como instruções de visitação, atendimento aos finais de semana, localização, etc.

![Detalhe 1](https://github.com/aabastos/Happy/blob/master/web/prints/orphanage-detail-1.png)
![Detalhe 1](https://github.com/aabastos/Happy/blob/master/web/prints/orphanage-detail-2.png)

## Login

Página para realização do login para acesso à área restrita do sistema (Dashboard)

![Login](https://github.com/aabastos/Happy/blob/master/web/prints/login.png)

## Dashboard - Orfanatos Aprovados

Página do Dashboard onde são listados os orfanatos aprovados. Deste orfanatos aprovados, é possível realizar a edição de um orfanato e também é possível fazer a remoção de um orfanato.

![Orfanatos Aprovados](https://github.com/aabastos/Happy/blob/master/web/prints/approved-orphanages.png)

## Dashboard - Orfanatos Pendentes

Página do Dashboard onde são listados os orfanatos que estão pendentes de aprovação.

![Orfanatos Pendentes](https://github.com/aabastos/Happy/blob/master/web/prints/to-approve-orphanages.png)

## Dashboard - Aprovação do Orfanato

Página para aprovação do orfanato. É mostrado as informações inseridas pelo usuário (podendo ser editadas pelo administrador) e as opções para Aprovação e Reprovação do Orfanato.

![Aprovação de Orfanato](https://github.com/aabastos/Happy/blob/master/web/prints/orphanage-edit.png)

## Dashboard - Remoção de Orfanato

Página para confirmação da remoção de um determinado Orfanato.

![Remoção de Orfanato](https://github.com/aabastos/Happy/blob/master/web/prints/orphanage-remove.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
