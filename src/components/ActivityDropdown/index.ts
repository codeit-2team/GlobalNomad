import Wrapper from './Dropdown';
import Item from './Item';
import Menu from './menu';
import Trigger from './trigger';

/**
 * ActivityDropdown 컴포넌트
 *
 * 트리거를 클릭할시 하단에 요소들이 나타나도록하는 공통컴포넌트입니다.
 *
 * @example
 * ```tsx
 *     <ActivityDropdown>
 *       <Trigger>메뉴 열기</Trigger>
 *       <Menu>
 *         <Item onClick={() => alert('수정됨')}>
 *           수정
 *         </Item>
 *         <Item onClick={() => alert('삭제됨')}>
 *           삭제
 *         </Item>
 *       </Menu>
 *     </ActivityDropdown>
 * ```
 */

const ActivityDropdown = Object.assign(Wrapper, {
  Trigger: Trigger,
  Menu: Menu,
  Item: Item,
});

export default ActivityDropdown;
