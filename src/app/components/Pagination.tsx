import { FunctionComponent } from 'react';

interface IPaginationProps {
  pos: number;
  step: number;
  onNext: () => void
  onPrev: () => void
  totalItems: number
}

const Pagination: FunctionComponent<IPaginationProps> = ({
  pos,
  step,
  onNext,
  onPrev,
  totalItems
}) => {
  const stepStart = pos;
  let stepEnd = pos + step;
  if (stepEnd > totalItems) {
    stepEnd = totalItems;
  }

  return <>
    <div className="pager-info" data-testid="pager-info">
      {stepStart} - {stepEnd} / {totalItems}
    </div>
    <div className="pager-actions" data-testid="pager-actions">
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button>
    </div>
  </>
}

export default Pagination;
