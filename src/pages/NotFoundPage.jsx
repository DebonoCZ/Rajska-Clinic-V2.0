import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="section not-found">
      <div className="container container--narrow">
        <h1 className="section__title">Stránka nenalezena</h1>
        <p className="section__lead">Je nám líto, tady nic není. Zkuste to z úvodní stránky.</p>
        <Link to="/" className="btn btn--primary">
          Zpět na úvod
        </Link>
      </div>
    </section>
  )
}
