import { useEffect, useState } from "react";
import { imagesIcon } from "../../../Utils/Icons";
import "./ImageDropZone.scss";

interface IImageDropZone {
  setFiles: (files: Array<File>) => void;
  files: Array<File>;
  label?: string;
  maxFiles?: number;
}

const ImageDropZone = (props: IImageDropZone) => {
  const { setFiles, files, label, maxFiles = 1 } = props;

  const [isError, setIsError] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const validateFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  useEffect(() => {
    if (files.length > 0) {
      const objectUrls = files.map((file) => URL.createObjectURL(file));
      setPreviews(objectUrls);

      return () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviews([]);
    }
  }, [files]);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(validateFile);

      if (validFiles.length + files.length > maxFiles) {
        setIsError(true);
        return;
      }

      setFiles([...files, ...validFiles]);
      setIsError(false);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="col-md-12 drop-zone">
      <div>
        <p className="mb-4 drop-zone-label">{label ?? "Seleccione archivos"}</p>
        <div
          className="drop-down-zone d-flex flex-column align-items-center justify-content-center p-5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileChange(e.dataTransfer.files);
          }}
        >
          {previews.length > 0 ? (
            <div className="preview-container">
              {previews.map((preview, index) => (
                <div key={index} className="text-center mb-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid mb-2 image-preview"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFile(index)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              {imagesIcon}
              <p className="text-center mb-2">Arrastrar aquí</p>
              <p className="text-center drop-zone-separator">
                <hr /> o <hr />
              </p>
              <label className="btn btn-secondary">
                Seleccionar archivos
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  multiple
                  hidden
                  onChange={(e) => handleFileChange(e.target.files)}
                />
              </label>
            </>
          )}
        </div>
        {isError && (
          <p className="errorMessage">
            {`Por favor, sube un archivo de imagen válido (JPG, PNG, GIF, WEBP) y no excedas el límite de ${maxFiles} imágen${
              maxFiles > 1 ? "es" : ""
            }.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageDropZone;
