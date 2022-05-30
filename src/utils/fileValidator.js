export class FileTypeValidator {
  fileType;
  validTypes;

  constructor(fileType, validTypes) {
    this.fileType = fileType;
    this.validTypes = validTypes;
  }

  validateFileType() {
    return this.validTypes.includes(this.fileType);
  }

  getErrorMessage() {
    return `${this.fileType} is not an accepted file type.`;
  }
}

export class DocumentFileSizeValidator {
  fileSizeInBytes;
  maxFileSizeInBytes = 512000;

  constructor(fileSize) {
    this.fileSizeInBytes = fileSize;
  }

  validateFileSize() {
    return this.fileSizeInBytes <= this.maxFileSizeInBytes;
  }

  getErrorMessage() {
    return "Maximum file size accepted is 500kb.";
  }
}

export class FileService {
  file;

  constructor(file) {
    this.file = file;
  }

  static getFileExtension(fileName) {
    const fileNames = fileName?.split(".");

    if (!fileNames) {
      return "";
    }

    if (fileNames.length === 0) {
      return "";
    }

    return fileNames[fileNames.length - 1];
  }
}

const fileTypes = ["jpg", "jpeg", "png", "doc", "docx", "pdf"];

async function validateFileSize(fileSize) {
  const validator = new DocumentFileSizeValidator(fileSize);
  const isValid = validator.validateFileSize();

  return {
    isValid,
    errorMessage: isValid ? "" : validator.getErrorMessage(),
  };
}

async function validateFileType(fileType) {
  const validator = new FileTypeValidator(fileType, fileTypes);
  const isValid = validator.validateFileType();

  return {
    isValid,
    errorMessage: isValid ? "" : validator.getErrorMessage(),
  };
}

export { validateFileSize, validateFileType };
