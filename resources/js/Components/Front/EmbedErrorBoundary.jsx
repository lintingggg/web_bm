import React from 'react';

class EmbedErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        console.warn('Embed Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-50 rounded-xl dark:bg-slate-800/50">
                    <p className="text-sm font-medium">Gagal memuat embed media sosial.</p>
                    <p className="text-xs mt-1">URL mungkin tidak valid atau akses diblokir.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default EmbedErrorBoundary;
