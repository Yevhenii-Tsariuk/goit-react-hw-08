import PageTitle from "../components/PageTitle/PageTitle";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { selectUser } from '../redux/auth/selectors';
import { useSelector } from "react-redux";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return isLoggedIn ?
    (<div>
        <PageTitle>
          Hello {user.name}, it`s your home page. How many people do you want to add today?
        </PageTitle>
     </div>
    ) : (<div>
      <PageTitle>
      Welcome to the application for adding contacts. Register or log in to your account.
      </PageTitle>
   </div> );
}