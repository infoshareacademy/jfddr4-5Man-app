import './account.scss'

export function Account(){
    return(
        <section className="accountMainSection">
            <button className="accounLogout">
                Logout
            </button>

            <button className="accounMail">
                Change mail
            </button>

            <button className="accounPassword">
                Change password
            </button>
        </section>
    )
}