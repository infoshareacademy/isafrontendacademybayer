import { Link } from 'react-router-dom';

export const User = ({ user }) => {
    // user.phone === (254) 954-1289
    const areaCodeEndIndex = user.phone.indexOf(")");
    // areaCodeEndIndex === 4
    const areaCode = user.phone.slice(0, areaCodeEndIndex + 1);
    // areaCode === (254)
    const actualPhoneNumber = user.phone.slice(areaCodeEndIndex + 1);
    // areaCode ===  954-1289

    return <li>
        <Link to={`/users/${user.id}`}>
            {user.name} 
        </Link> 
         works in {user.company.name} <br />
        <i>{areaCode}</i> {actualPhoneNumber}
    </li>
}