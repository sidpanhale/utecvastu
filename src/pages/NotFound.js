import React from 'react';

const styles = {
    headingNotFound: {
      justifyContent : "center",
      alignItems : "center",
      height : "100vh"
    },
    h1Text : {
        color: "red",
        margin : "340px 572px"
    }}

export default function NotFound() {
    return (
        <div style={styles.headingNotFound}>
            <h1 style={styles.h1Text}>Page Not Found</h1>
        </div>
    )
}

