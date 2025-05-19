// src/components/Footer.tsx

const Footer = () => {
    return (
    <footer className="bg-gray-700 text-white p-4 mt-auto"> {}
        <div className="container mx-auto text-center">
            <p>{new Date().getFullYear()} &copy; MovieApp. все права защищены</p>
            <p>Разработано с ❤️</p>
        </div>
    </footer>
    );
};

export default Footer;
