import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/setting">Setting</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
