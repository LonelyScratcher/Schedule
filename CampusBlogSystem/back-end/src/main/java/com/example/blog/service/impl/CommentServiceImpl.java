package com.example.blog.service.impl;
import java.util.Date;

import com.example.blog.dao.*;
import com.example.blog.domain.dto.CommentVerifyDto;
import com.example.blog.domain.pojo.*;
import com.example.blog.domain.vo.CommentVo;
import com.example.blog.exception.BusinessException;
import com.example.blog.service.CommentService;
import com.example.blog.util.Code;
import com.example.blog.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    CommentAuditRepository commentAuditRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AdminRepository adminRepository;
    @Override
    public void insertComment(Comment comment) {
        commentRepository.save(comment);
    }


    @Override
    public List<CommentVo> accessList(int userId) {
        List<Comment> commentList = commentRepository.findByUserIdAndState(userId, Constant.APPROVED_ADOPT);
        List<CommentVo> commentVoList = new ArrayList<>();
        for (Comment comment:commentList){
            CommentVo commentVo = plusInfo(comment);
            commentVoList.add(commentVo);
        }
        return commentVoList;
    }

    @Override
    public List<CommentVo> list(int userId) {
        List<Comment> commentList = commentRepository.findByUserIdAndStateNot(userId,Constant.APPROVED_ADOPT);
        List<CommentVo> commentVoList = new ArrayList<>();
        for (Comment comment:commentList){
            CommentVo commentVo = plusInfo(comment);
            commentVoList.add(commentVo);
        }
        return commentVoList;
    }

    private CommentVo plusInfo(Comment comment){
        Integer id = comment.getId();
        int blogId = comment.getBlogId();
        int userId = comment.getUserId();
        int state = comment.getState();
        String content = comment.getContent();
        Date date = comment.getDate();
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog == null) throw new BusinessException(Code.BUSINESS_ERR,"查询评论数据失败！");
        String blogTitle = blog.getTitle();
        Admin admin = adminRepository.findById(userId).orElse(null);
        Student student = studentRepository.findById(userId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        String author = "";
        String avatarUrl = "user.jpg";
        if (admin!=null) {
            author = admin.getName();
            avatarUrl = admin.getAvatarUrl();
        }
        if (student!=null){
            author = student.getName();
            avatarUrl = student.getAvatarUrl();
        }
        String username = user != null ? user.getUsername() : "";

        return new CommentVo(id, blogId, userId, state, content, blogTitle, date, author, username, avatarUrl);
    }

    @Override
    public List<Comment> commentList(int blogId) {
        List<Comment> commentList = commentRepository.findByBlogId(blogId);
        return commentList;
    }

    @Override
    public void rewrite(Comment comment) {
        int commentId = comment.getId();
        Comment target = commentRepository.findById(commentId).orElse(null);
        if (target==null) throw new BusinessException(Code.BUSINESS_ERR,"重新提交评论失败！");
        int state = target.getState();
        if (state==Constant.APPROVED_REFUSE) {
            commentAuditRepository.removeByCommentId(commentId);
        }
        target.setState(Constant.PEND_REVIEW);
        target.setContent(comment.getContent());
        commentRepository.save(target);
    }

    @Override
    public void remove(int commentId) {
        //这里删除还应该判断commentId对于comment是拒绝再删除原因
        Comment comment =  commentRepository.findById(commentId).orElse(null);
        if (comment==null) throw new BusinessException(Code.BUSINESS_ERR,"删除评论失败");
        if (comment.getState()==Constant.APPROVED_REFUSE){
            CommentAudit commentAudit = commentAuditRepository.findByCommentId(commentId);
            commentAuditRepository.deleteById(commentAudit.getId());
        }
        commentRepository.deleteById(commentId);
    }

    @Override
    public List<CommentVo> verifyList() {
        List<Comment> commentList = commentRepository.findAll();
        List<CommentVo> commentVoList = new ArrayList<>();
        for (Comment comment:commentList){
            CommentVo commentVo = plusInfo(comment);
            commentVoList.add(commentVo);
        }
        return commentVoList;
    }

    @Override
    public List<CommentVo> browseList() {
        List<Comment> commentList = commentRepository.findByState(Constant.APPROVED_ADOPT);
        List<CommentVo> commentVoList = new ArrayList<>();
        for (Comment comment:commentList){
            CommentVo commentVo = plusInfo(comment);
            commentVoList.add(commentVo);
        }
        return commentVoList;
    }

    @Override
    public void verify(CommentVerifyDto commentVerifyDto) {
        int commentId = commentVerifyDto.getCommentId();
        boolean isResult = commentVerifyDto.isResult();
        String reason = commentVerifyDto.getReason();
        CommentAudit commentAudit = new CommentAudit();
        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment==null) throw new BusinessException(Code.BUSINESS_ERR,"审核评论失败！");
        if (isResult){
            comment.setState(Constant.APPROVED_ADOPT);
        }else {
            comment.setState(Constant.APPROVED_REFUSE);
            commentAudit.setCommentId(commentId);
            commentAudit.setReason(reason);
            commentAuditRepository.save(commentAudit);
        }
        commentRepository.save(comment);

    }

    @Override
    public CommentAudit check(int commentId) {
        return commentAuditRepository.findByCommentId(commentId);
    }

    @Override
    public void update(Comment comment) {
        Comment target = commentRepository.findById(comment.getId()).orElse(null);
        if (target==null) throw new BusinessException(Code.BUSINESS_ERR,"更新评论失败！");
        target.setContent(comment.getContent());
        commentRepository.save(target);
    }

    @Override
    public List<CommentVo> blogOwn(int blogId) {
        List<Comment> commentList = commentRepository.findByBlogIdAndState(blogId,Constant.APPROVED_ADOPT);
        List<CommentVo> commentVoList = new ArrayList<>();
        for (Comment comment:commentList){
            CommentVo commentVo = plusInfo(comment);
            commentVoList.add(commentVo);
        }
        return commentVoList;
    }

    @Override
    public String reason(int commentId) {
        CommentAudit commentAudit = commentAuditRepository.findByCommentId(commentId);
        if (commentAudit==null) throw new BusinessException(Code.BUSINESS_ERR,"查询审核拒绝理由失败！");
        return commentAudit.getReason();
    }

}
