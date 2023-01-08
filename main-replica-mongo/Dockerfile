FROM mongo
RUN mkdir /config
RUN mkdir -p /var/log/mongodb/
WORKDIR /config
COPY ./wait-for-it.sh .
COPY ./mongo-setup.sh .
COPY ./wait-and-start.sh .
COPY ./replica-script.js .
RUN chmod +x wait-and-start.sh
RUN chmod +x wait-for-it.sh
RUN chmod +x mongo-setup.sh
EXPOSE 30001
CMD ["sh","-c","/config/wait-and-start.sh"]