import Document, {
    Head,
    Html,
    Main,
    NextScript
} from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <link rel="icon" href="/favicon.png" />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
