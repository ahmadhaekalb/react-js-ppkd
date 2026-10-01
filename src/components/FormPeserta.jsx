import { useState, useEffect } from 'react';
const FormPeserta = ({ onSimpan, onCancel, pesertaEdit}) => {

    const [nama, setNama] = useState("");
    const [jurusan, setJurusan] = useState("");

    // useEffect : hasil request dari server menghasilkan sebuah data dan dirender hanya sekali

    useEffect(() => {
      if(pesertaEdit){
        // edit
        setNama(pesertaEdit.nama)
        setJurusan(pesertaEdit.jurusan)
          // tambah
      } else {
        setNama("")
        setJurusan("")
      }
    }, [pesertaEdit]);

    const handleSimpan = (e) => {
        e.preventDefault();
        //jika dia ngedit
        if(pesertaEdit){

        }
        onSimpan({
            id: pesertaEdit ? pesertaEdit.id : Date.now(),
            nama,
            jurusan
        });
        setNama("");
        setJurusan("");
    };
    return (
        <form onSubmit= {handleSimpan}
         method="post" style={{
            background: "#457ff1",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "20px",
        }}
        >
            <h3 style={{ color: 'white' }}>Tambah Peserta</h3>
            <div className="" style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
            }}
            >
                <input type="text"
                 placeholder="Nama Peserta"
                 value={nama}
                 onChange={(e) => setNama (e.target.value)}
                 style={{ padding: "8px",   
                 }} />
                <input type="text"
                 placeholder="Jurusan"
                 value={jurusan} 
                    onChange={(e) => setJurusan (e.target.value)

                } />
                <button type="submit"
                    style={{
                        background: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        padding: "8px 16px",
                    }}
                >
                    Simpan
                </button>
            </div>
        </form>
    );
};

export default FormPeserta;