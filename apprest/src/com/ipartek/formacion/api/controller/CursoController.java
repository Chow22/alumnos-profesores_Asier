package com.ipartek.formacion.api.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.dao.CursoDAO;


@Path("/cursos")
@Produces("application/json")
@Consumes("application/json")
public class CursoController {

	private static final Logger LOGGER = Logger.getLogger(CursoController.class.getCanonicalName());


	private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	private Validator validator = factory.getValidator();

	@Context
	private ServletContext context;


	public CursoController() {
		super();
	}
	@GET
	public Response getAll( @QueryParam("filtro") String filtro ) {
		
		LOGGER.info("getAll " + filtro);		
		ArrayList<Curso> registros = new ArrayList<Curso>(); 
		CursoDAO cursoDAO = CursoDAO.getInstancia();
		
		
		if ( filtro != null && !"".equals(filtro.trim())) {
			registros = (ArrayList<Curso>) cursoDAO.getPorNombre(filtro);
			
		}else {
			registros = (ArrayList<Curso>) cursoDAO.getAll();			
			
		}
		
		Response response = Response.status(Status.OK).entity(registros).build();
		
		return response;
	}
	
	
	

	@POST
	public Response insert(Curso Curso) throws Exception {
		LOGGER.info("insert(" + Curso + ")");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		// validar pojo
		Set<ConstraintViolation<Curso>> violations = validator.validate(Curso);

		if (violations.isEmpty()) {

			CursoDAO cursoDAO = CursoDAO.getInstancia();

			cursoDAO.insert(Curso);

			response = Response.status(Status.CREATED).entity(Curso).build();

		} else {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Curso> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}

			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}

		return response;

	}

	@PUT
	@Path("/{id: \\d+}")
	public Response update(@PathParam("id") int id, Curso Curso) throws SQLException, Exception {
		LOGGER.info("update(" + id + ", " + Curso + ")");
		Response response = Response.status(Status.NOT_FOUND).entity(null).build();

		// validar objeto Curso javax.validation

		Set<ConstraintViolation<Curso>> violations = validator.validate(Curso);

		if (violations.isEmpty()) {
			CursoDAO cursoDAO = CursoDAO.getInstancia();
			cursoDAO.update(Curso);
			response = Response.status(Status.OK).entity(Curso).build();

		} else {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Curso> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}

			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}

		return response;

	}

	@DELETE
	@Path("/{id: \\d+}")
	public Response eliminar(@PathParam("id") int id) {
		LOGGER.info("eliminar(" + id + ")");
		CursoDAO cursoDAO = CursoDAO.getInstancia();
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		Curso Curso = null;
		
		try {
			Curso=cursoDAO.delete(id);
			response = Response.status(Status.OK).entity(Curso).build();
			
		}catch (SQLException e) {
			response = Response.status(Status.CONFLICT).entity(e.getMessage()).build();
			
		}catch (Exception e) {
			response = Response.status(Status.NOT_FOUND).entity(e.getMessage()).build();
		}
		return response;
	}

}
