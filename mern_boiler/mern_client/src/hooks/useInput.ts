import { useCallback, useState } from "react";

function useInput(initialForm: string) {
  const [value, setValue] = useState(initialForm);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setValue(value);  // value 업데이트
  },
  []);

  return {value, onChange};
}

export default useInput