import { useEffect, useState } from "react";
import "./ImageDropZone.scss";

interface IImageDropZone {
  setFile: (file: File | null) => void;
  file: File | null;
  label?: string;
}

const ImageDropZone = (props: IImageDropZone) => {
  const { setFile, file, label } = props;

  const [isError, setIsError] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    return allowedTypes.includes(file.type);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="col-md-12 drop-zone">
      <div>
        <h5 className="mb-4">{label ?? "Seleccione un archivo"}</h5>
        <div
          className="drop-down-zone d-flex flex-column align-items-center justify-content-center p-5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileChange(e.dataTransfer.files[0]);
          }}
        >
          {preview ? (
            <div className="text-center preview-container">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid mb-2"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <button
                className="btn btn-link text-danger"
                onClick={() => setFile(null)}
              >
                Remover archivo seleccionado
              </button>
            </div>
          ) : (
            <>
              <i className="fa-solid fa-images fa-xl file-drop-thumbnail"></i>
              <p className="text-center mb-2">Arrastrar aquí</p>
              <p className="text-center"> ---------- o ----------</p>
              <label className="btn btn-secondary">
                Seleccionar archivo
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] || null)
                  }
                />
              </label>
            </>
          )}
        </div>
        {isError && (
          <p className="errorMessage">
            {
              "Por favor, sube un archivo de imagen válido (JPG, PNG, GIF, WEBP)."
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageDropZone;
