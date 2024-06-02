import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { getMMR } from '../services/api';
import usersData from '../data';
import { Button } from 'primereact/button';

export default function Home() {
  const [mmrList, setMmrList] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    document.title = "Rank das Minas";
    fetchAllMMR();
  }, []);

  const fetchAllMMR = async () => {
    setLoading(true);
    try {
      const mmrDataList = await Promise.all(
        usersData.map(async (userData) => {
          if (!userData) return null;
          const [username, tag] = userData.name.split('#');
          const mmrData = await getMMR(username, tag);
          return { ...userData, username: `${username}#${tag}`, mmr: mmrData };
        })
      );
      const filteredMmrDataList = mmrDataList.filter(item => item !== null);
      setMmrList(filteredMmrDataList);
      setAllData(filteredMmrDataList);
    } catch (error) {
      console.error('Error fetching MMR:', error);
    } finally {
      setLoading(false);
    }
  };

  const refetchMMR = async (username, tag) => {
    setLoading(true);
    try {
      const newMMR = await getMMR(username, tag);
      const updatedMmrList = mmrList.map(item => {
        if (item.username === `${username}#${tag}`) {
          return { ...item, mmr: newMMR };
        }
        return item;
      });
      setMmrList(updatedMmrList);
      setAllData(updatedMmrList);
    } catch (error) {
      console.error('Error refetching MMR:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFilter = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    if (value === '') {
      setMmrList(allData);
    } else {
      const filteredList = allData.filter((item) =>
        (item.username && item.username.toLowerCase().includes(value)) ||
        (item.mmr && item.mmr.toString().toLowerCase().includes(value))
      );
      setMmrList(filteredList);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-black text-center font-semibold">Valorant MMR</h1>
        <Button
          className="my-4"
          onClick={fetchAllMMR}
          disabled={loading}
          label={loading ? 'Carregando' : 'Carregar dados'}
        />
        <div>
          <InputText
            className="w-full py-2 px-3 border rounded-md mb-4"
            placeholder="Pesquisar Nome ou Rank"
            value={filterValue}
            onChange={onFilter}
          />
        </div>
        <div className="overflow-x-auto">
          <DataTable
            scrollable
            scrollHeight="40rem"
            value={mmrList}
            loading={loading}
            className="w-full table-auto"
            emptyMessage="Não encontrado"
          >
            <Column field="username" header="RIOT ID + TAG" body={rowData => (
              <>
                {rowData.image && (
                  <div className='flex items-center'>
                    <img src={rowData.image} alt={rowData.username} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <span className='ml-3'>{rowData.username}</span>
                  </div>
                )}
                {!rowData.image && (
                  <span>{rowData.username}</span>
                )}
              </>
            )} />
            <Column field="mmr" header="MMR" body={rowData => (
              <>
                {rowData.mmr !== null ? rowData.mmr : (
                  <Button
                    label="Refazer"
                    onClick={() => refetchMMR(rowData.username.split('#')[0], rowData.username.split('#')[1])}
                  />
                )}
              </>
            )} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
