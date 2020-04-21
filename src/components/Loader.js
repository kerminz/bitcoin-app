import React from 'react'
import Loader from 'react-loader-spinner'

class AppLoader extends React.Component {
    render() {
        return (
            <div style={{ height: "100vh" }}>
                <Loader
                    type="Bars"
                    color="#00BFFF"
                    style={{ margin: "auto", width: "80px" }}
                />
            </div>
        )
    }
}

export default AppLoader