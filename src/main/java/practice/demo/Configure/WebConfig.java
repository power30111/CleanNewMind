package practice.demo.Configure;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.data.web.SortHandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        //Sorting에 대한 설정을 수정하는 Resolver
        SortHandlerMethodArgumentResolver sortArgumentResolver = new SortHandlerMethodArgumentResolver();
        //sort 요청시 요청파라미터를 수정하는 메서드. Default값은 sort이다.
        sortArgumentResolver.setSortParameter("sortBy");
        //정렬조건 값을 전달할 때 정렬조건필드 property와 정렬기준 property를 구분하는 구분자를 설정할수있다.
        //Default는 , 이며 현재 "-"로 수정하였다.
        sortArgumentResolver.setPropertyDelimiter("-");

        //Paging에 대한 설정을 수정하는 Resolver
        PageableHandlerMethodArgumentResolver pageableArgumentResolver = new PageableHandlerMethodArgumentResolver(sortArgumentResolver);
        //page 기본값을 1로 설정하게 하는 메서드.(페이지 번호가 인덱스번호인 0번부터 시작하지않도록해주는것)
        pageableArgumentResolver.setOneIndexedParameters(true);
        //paging 요청에 대해 한번에 많은 갯수를 요청하는 경우를 대비하여, 최대 요청가능한 size를 설정할수있다.
        pageableArgumentResolver.setMaxPageSize(100);
        //페이지 요청이 없는 경우 기본적으로 요청되는 페이징 정보를 설정하는 메서드. 기본은 page = 0, size = 20
        pageableArgumentResolver.setFallbackPageable(PageRequest.of(0,10));
        argumentResolvers.add(pageableArgumentResolver);
    }
}
