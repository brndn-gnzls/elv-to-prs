import React from "react";
import AppRouter from'./routes/AppRouter';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
    return (
        <div className="App">
            <ErrorBoundary>
                <AppRouter />
            </ErrorBoundary>
        </div>
    )
}

export default App;