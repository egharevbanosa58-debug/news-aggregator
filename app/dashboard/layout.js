export const metadata = {
    robots: {
        index: false,
        follow: false,
    },

    title: "NewsLite news aggregator",
    description: "A News aggregator web app created by NOSA",
};

export default function DashboardLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}