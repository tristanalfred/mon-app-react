import { useEffect, useState } from 'react';
import './App.css';

const url = 'http://127.0.0.1:8000/schedule/members';

export interface MemberType {
  id: string;
  first_name: string;
  last_name: string;
}

function MyApp() {
  const [members, setMembers] = useState<MemberType[]>([])

  const listItems = members.map(member =>
    <li key={member.id}>
      {member.first_name}
      {member.last_name}
    </li>
  );

  const listItems2 = members.map(member =>
    <tr>
      <td> {member.first_name} </td>
      <td> {member.last_name} </td>
    </tr>
  );

  useEffect(() => {
    const fun = async () => {
      const urlResponse = await fetch(url);

      const json = await urlResponse.json();
      console.log(json);
      setMembers(json.data);
    };

    fun();
  }, []);

  // return (
  //   <>
  //     <h1>titre</h1>
  //     <ul>{listItems}</ul>
  //   </>
  // )
  return (
    <>
      <h1>titre</h1>
      <table>
        <tr>
          <th>Firstname</th>
          <th>LastName</th>
        </tr>
        {listItems2}
      </table>
    </>
  )
}

export default MyApp
