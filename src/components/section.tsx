import { ReactElement } from 'react';

const Section = (props) => {
  let sectionId = undefined;
  let subSections: ReactElement[] = [];
  let children: ReactElement[] = [];
  props.children.forEach((el: ReactElement) => {
    const myType = typeof el.type === 'string' ? el.type : el.type.name;
    if (myType == 'section') {
      subSections.push(el);
    } else {
      children.push(el);
      if (['h2', 'h3', 'h4'].includes(myType)) {
        sectionId = el.props.id;
      }
    }
  });
  return (
    <section>
      <div className="toc-tracker" data-id={sectionId}>
        {children}
      </div>
      {subSections}
    </section>
  );
};

export default Section;
