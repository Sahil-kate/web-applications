import Navbar from '../components/Navbar';
import '../styles/globals.css';

export const metadata = {
  title: 'Your Name - Full Stack Web Developer',
  description: 'Personal portfolio showcasing projects, skills, and experience as a Full Stack Web Developer',
  // TODO: Replace "Your Name" with your actual name
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
