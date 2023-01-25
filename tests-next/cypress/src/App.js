import { Navigation } from './navigation';
import { Content } from './content'
import { UserProvider } from './services/user-context'

function App() {
  return (
    <UserProvider>
        <Navigation />
        <Content/>
    </UserProvider>
  );
}

export default App;
