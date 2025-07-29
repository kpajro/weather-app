export function ModButton({_text, _function, _keys = ()=>{} , _style = {}, _divstyle = {}, _divclass = "", _buttonclass = "", _title}){
    return (
        <div style={_divstyle} className={_divclass}>
            <button onClick={_function} onKeyDown={_keys} title={_title} className={_buttonclass} style={_style}>{_text}</button>
        </div>
    )
}