import Table from 'react-bootstrap/Table';

function Grid({rows,headers}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {
            headers.map((header,idx) => <th key={idx+"_h"}>{header}</th>)
          }
        </tr>
      </thead>
      <tbody>
       {
        rows.map((row,_) => (
           <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.name || "NA"}</td>
          <td>{row.email || "NA"}</td>
        </tr>
        ))
       }
      </tbody>
    </Table>
  );
}

export default Grid;