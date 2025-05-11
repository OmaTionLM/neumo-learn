import styles from "./ContentModule.module.css"; // Import CSS module for styling

// export default function ContentModule({ type = "primary", children, backgroundImage }) {
//     return (
//         <div
//             className={`${styles.container} ${styles[type]}`}
//             style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none" }}
//         >
//             <div className={styles.content}>
//                 {children} {/* Render children here */}
//             </div>
//         </div>
//     );
// }

const ContentModule = ({ type = "primary", children, backgroundImage, backgroundColor, size }) => {
    return (
        <div
                className={`${styles.container} ${styles[type]}`}
                style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
                backgroundColor: backgroundColor || "transparent",
                minHeight: size || "auto",
               
            }}
                
            >
           
                <div className={styles.content}>
                    {children} {/* Render children here */}
                </div>
            </div>

    
    );
};

export default ContentModule;