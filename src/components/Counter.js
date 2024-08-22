const Counter = ({score}) => {
    return (
        <div className="counter">
            <span>Герой 1: </span> {score.hero1}
            <br/>
            <span>Герой 2: </span> {score.hero2}
        </div>
    )
}
export default Counter;