import Backdrop from "./backdrop";
import BotaoLateral from "./botaolateral";

export default function MenuLateral(props) {
    const windowHeight = document.getElementsByTagName('body')[0].getBoundingClientRect().height;

    // altura do menu superior (será usado como um espaço vazio para o menu lateral)
    const menuHeight = document.getElementById('menubar')
        ? document.getElementById('menubar').getBoundingClientRect().height + 8
        : 60;

    return (
    <>
      <Backdrop onClick={props.onClose} />

      <div className="z-[15] absolute left-0 top-0 min-h-screen h-max  w-fit
       text-black flex flex-col bg-secondary-bg/80
       border-r border-secondary-bg
       shadow-xl shadow-gray-500"
       style={{ height: `${windowHeight}px`}}
      >
        <div className="flex-none" style={{ height: `${menuHeight}px` }}>&nbsp;</div>
        <div className="flex-none">
            <BotaoLateral descricao="PAINEL" href="/" img="/img/home.png" onClick={props.onClose} />
            <BotaoLateral descricao="PERFIL" href="/perfil" img="/img/user.png" onClick={props.onClose} />
            {/*<BotaoLateral descricao="FREQUÊNCIA" href="/frequencia" img="/img/calendar_dot.png" onClick={props.onClose} />*/}
            <BotaoLateral descricao="FICHA" href="/ficha" img="/img/muscle.png" onClick={props.onClose} />
            <BotaoLateral descricao="SUPLEMENTOS" href="/remedios" img="/img/pills.png" onClick={props.onClose} />
            <BotaoLateral descricao="PESO" href="/peso" img="/img/weight.png" onClick={props.onClose} />
        </div>
        <div className="flex-1"></div>
        <BotaoLateral descricao="SAIR" href="/sair" img="/img/logout.png" onClick={props.onClose} />
      </div>
    </>
  )
}
