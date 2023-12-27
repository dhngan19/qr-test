import ReactDOM from "react-dom/client";

export const clientRenderToString = (element: React.ReactElement): Promise<string> =>
    new Promise(resolve => {
        const container = document.createElement('div');
        const renderCallback = () => {
            resolve(container.firstElementChild?.innerHTML || '');
        };
        
        ReactDOM.createRoot(container).render(<div ref={renderCallback}>{element}</div>);
    });