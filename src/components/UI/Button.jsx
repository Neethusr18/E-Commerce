// export default function Button({children, textOnly, className, ...props}){
//     const cssClasses= textOnly  ? 'text-button' : 'button';
//     cssClasses += ' ' + className;
//     return (<button className={cssClasses} {...props}>
//         {children}
//         </button>
//     );
// }

export default function Button({ children, textOnly, className = '', ...props }) {
    const cssClasses = (textOnly ? 'text-button' : 'button') + (className ? ` ${className}` : '');

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}
