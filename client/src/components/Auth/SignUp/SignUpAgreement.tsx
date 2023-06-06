import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Divider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CheckboxGroup, CheckBoxWrapper } from '@Common/Common.styles';

interface SignUpAgreementProps {
  setIsAgreed: Dispatch<SetStateAction<boolean>>;
}

const SignUpAgreement = ({ setIsAgreed }: SignUpAgreementProps): JSX.Element => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const agreements = [
    '(필수) 서비스 이용약관 동의',
    '(필수) 개인정보처리방침 동의',
    '(필수) 위치기반서비스 동의',
    '(필수) 만 14세 이상입니다.',
  ];

  const agreementsUrl = ['/etc/service', '/etc/privacy', '/etc/location'];

  const onCheckChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setCheckAll(list.length === agreements.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? agreements : []);
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    setIsAgreed(checkAll);
  }, [checkAll]);

  return (
    <>
      <Checkbox onChange={onCheckAllChange} checked={checkAll}>
        이용약관 전체 동의
      </Checkbox>
      <Divider />
      <CheckboxGroup value={checkedList} onChange={onCheckChange}>
        {agreements.map((agreement, index) => (
          <CheckBoxWrapper key={agreement}>
            <Checkbox value={agreement}>{agreement}</Checkbox>
            {index < 3 && <Link to={agreementsUrl[index]}>약관보기</Link>}
          </CheckBoxWrapper>
        ))}
      </CheckboxGroup>
    </>
  );
};

export default SignUpAgreement;
