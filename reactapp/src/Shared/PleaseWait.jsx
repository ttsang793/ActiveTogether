import "./PleaseWait.css"

export default function PleaseWait() {
  return (
    <div className="please-wait">
      <div>
        <div className="text-center">
          <img src="/please-wait.webp" alt="Please wait!" />
        </div>
        <div className="text-center">Bạn chờ chút nhé!</div>
      </div>
    </div>
  )
}