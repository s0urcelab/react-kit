/**
 *  @Author  : s0urce <apao@douyu.tv>
 *  @Date    : 2020/5/29
 *  @Declare : contains 检查元素包含关系
 *
 */

export default function contains(root, n) {
    let node = n;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
