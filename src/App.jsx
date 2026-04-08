import logo from "/logo.svg";
import "./App.css";


function App() {
  return (
    <main data-form>
      <header className="verif-form-header">
        <img src={logo} alt="ab33 logo" />
      </header>

      <div className="form-wrapper">
        <h1>Sign up</h1>

        <form method="post">
          <div data-form-group>
            <label htmlFor="fullName">
              <span className="mono">FULL NAME</span>
              <input type="text" />
            </label>

            <label htmlFor="email">
              <span className="mono">EMAIL</span>
              <input type="email" />
            </label>

            <label htmlFor="password">
              <span className="mono">PASSWORD</span>
              <input type="password" />
            </label>
          </div>

          <span className="c-new-acct handwritten">
            Don't have an account? create one here
          </span>

          <div className="form-btn-group">
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="mono"
            >
              Create my account
            </button>

            {/* <span className="handwritten">or</span>

            <button className="mono">Continue with Google</button> */}
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
